'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  if (scene.includes('my.spline.design') || !scene.endsWith('.splinecode')) {
    return (
      <iframe
        src={scene}
        className={className}
        style={{ border: 'none', width: '100%', height: '100%' }}
        allow="autoplay; fullscreen"
        loading="lazy"
        title="Spline 3D Scene"
      />
    )
  }

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
