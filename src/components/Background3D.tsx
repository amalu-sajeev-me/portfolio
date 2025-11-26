"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sphere } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function Stars(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#6366f1"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function FloatingOrbs() {
    const orb1Ref = useRef<any>(null);
    const orb2Ref = useRef<any>(null);
    const orb3Ref = useRef<any>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        if (orb1Ref.current) {
            orb1Ref.current.position.x = Math.sin(t * 0.3) * 0.5;
            orb1Ref.current.position.y = Math.cos(t * 0.2) * 0.5;
        }
        
        if (orb2Ref.current) {
            orb2Ref.current.position.x = Math.cos(t * 0.4) * 0.7;
            orb2Ref.current.position.y = Math.sin(t * 0.3) * 0.6;
        }
        
        if (orb3Ref.current) {
            orb3Ref.current.position.x = Math.sin(t * 0.5) * 0.6;
            orb3Ref.current.position.y = Math.cos(t * 0.4) * 0.4;
        }
    });

    return (
        <>
            <Sphere ref={orb1Ref} args={[0.1, 32, 32]} position={[0.5, 0.5, -0.5]}>
                <meshStandardMaterial 
                    color="#6366f1" 
                    transparent 
                    opacity={0.3}
                    emissive="#6366f1"
                    emissiveIntensity={0.5}
                />
            </Sphere>
            <Sphere ref={orb2Ref} args={[0.08, 32, 32]} position={[-0.7, 0.3, -0.3]}>
                <meshStandardMaterial 
                    color="#06b6d4" 
                    transparent 
                    opacity={0.3}
                    emissive="#06b6d4"
                    emissiveIntensity={0.5}
                />
            </Sphere>
            <Sphere ref={orb3Ref} args={[0.12, 32, 32]} position={[0.3, -0.5, -0.7]}>
                <meshStandardMaterial 
                    color="#ec4899" 
                    transparent 
                    opacity={0.3}
                    emissive="#ec4899"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </>
    );
}

function MouseParallax() {
    const { camera } = useThree();
    
    useFrame((state) => {
        const { mouse } = state;
        camera.position.x = mouse.x * 0.05;
        camera.position.y = mouse.y * 0.05;
        camera.lookAt(0, 0, 0);
    });
    
    return null;
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 z-[-1] bg-background">
            <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <Stars />
                    <FloatingOrbs />
                    <MouseParallax />
                </Suspense>
            </Canvas>
        </div>
    );
}
