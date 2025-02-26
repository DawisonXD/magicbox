import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
	useGLTF,
	Edges,
	MeshPortalMaterial,
	Environment,
} from '@react-three/drei';
import { useControls } from 'leva';

export const MainMesh = () => {
	const mainMesh = useRef();

	useFrame(() => {
		mainMesh.current.rotation.x += 0.01;
	});
	return (
		<mesh castShadow receiveShadow ref={mainMesh}>
			<boxGeometry args={[2, 2, 2]} />
			<Edges />
			<Side rotation={[0, 0, 0]} bg='orange' index={0}>
				<torusGeometry args={[0.65, 0.3, 64]} />
			</Side>
			<Side rotation={[0, Math.PI, 0]} bg='lightblue' index={1}>
				<torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
			</Side>
			<Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg='lightgreen' index={2}>
				<boxGeometry args={[1.15, 1.15, 1.15]} />
			</Side>
			<Side rotation={[0, Math.PI / 2, -Math.PI / 2]} bg='aquamarine' index={3}>
				<octahedronGeometry />
			</Side>
			<Side rotation={[0, -Math.PI / 2, 0]} bg='indianred' index={4}>
				<icosahedronGeometry />
			</Side>
			<Side rotation={[0, Math.PI / 2, 0]} bg='hotpink' index={5}>
				<dodecahedronGeometry />
			</Side>
		</mesh>
	);
};

function Side({ rotation = [0, 0, 0], bg = '#f0f0f0', children, index }) {
	const mesh = useRef();
	const { worldUnits } = useControls({ worldUnits: false });
	const { nodes } = useGLTF('/aobox-transformed.glb');
	useFrame((state, delta) => {
		mesh.current.rotation.x = mesh.current.rotation.y += delta;
	});
	return (
		<MeshPortalMaterial worldUnits={worldUnits} attach={`material-${index}`}>
			<ambientLight intensity={1} />
			<Environment preset='city' />
			<mesh
				castShadow
				receiveShadow
				rotation={rotation}
				geometry={nodes.Cube.geometry}
			>
				<meshStandardMaterial
					aoMapIntensity={1}
					aoMap={nodes.Cube.material.aoMap}
					color={bg}
				/>
				<spotLight
					castShadow
					color={bg}
					intensity={2}
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					shadow-normalBias={0.05}
					shadow-bias={0.0001}
				/>
			</mesh>
			<mesh castShadow receiveShadow ref={mesh}>
				{children}
				<meshStandardMaterial color={bg} />
			</mesh>
		</MeshPortalMaterial>
	);
}
