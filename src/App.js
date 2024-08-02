import { Canvas } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { MainMesh } from './components/mainMesh';

export const App = () => {
	return (
		<Canvas shadows camera={{ position: [-3, 0.5, 3] }}>
			<MainMesh castShadow receiveShadow></MainMesh>
			<CameraControls makeDefault />
		</Canvas>
	);
};
