// src/App.tsx  ← REPLACE your existing App.tsx with this
import React from 'react'
import { SupportedWallet, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import TeamSetup from './TeamSetup'
import ErrorBoundary from './components/ErrorBoundary'
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

let supportedWallets: SupportedWallet[]
if (import.meta.env.VITE_ALGOD_NETWORK === 'localnet') {
  const kmdConfig = getKmdConfigFromViteEnvironment()
  supportedWallets = [
    {
      id: WalletId.KMD,
      options: {
        baseServer: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ]
} else {
  supportedWallets = [
    { id: WalletId.DEFLY },
    { id: WalletId.PERA },
    { id: WalletId.EXODUS },
    { id: WalletId.LUTE },
  ]
}

// ─── Route Guards ─────────────────────────────────────────────────────────────

/** Requires the user to be logged in. */
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

/**
 * Requires login AND completed team setup.
 * Logged in but no team → /team-setup
 */
const RequireTeam: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const teamDone = localStorage.getItem('teamSetupDone') === 'true'
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (!teamDone) return <Navigate to="/team-setup" replace />
  return <>{children}</>
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()

  const walletManager = new WalletManager({
    wallets: supportedWallets,
    defaultNetwork: algodConfig.network,
    networks: {
      [algodConfig.network]: {
        algod: {
          baseServer: algodConfig.server,
          port: algodConfig.port,
          token: String(algodConfig.token),
        },
      },
    },
    options: {
      resetNetwork: true,
    },
  })

  return (
    <ErrorBoundary>
      <SnackbarProvider maxSnack={3}>
        <WalletProvider manager={walletManager}>
          <BrowserRouter>
            <Routes>
              {/* 1. Public: Login */}
              <Route path="/login" element={<Login />} />

              {/* 2. Auth-only: Team Setup */}
              <Route
                path="/team-setup"
                element={
                  <RequireAuth>
                    <TeamSetup />
                  </RequireAuth>
                }
              />

              {/* 3. Fully onboarded: Main App */}
              <Route
                path="/"
                element={
                  <RequireTeam>
                    <Home />
                  </RequireTeam>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </SnackbarProvider>
    </ErrorBoundary>
  )
}
