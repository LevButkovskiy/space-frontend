import {useEffect, useState} from "react"
import pJson from "../package.json"
import "./App.css"
import reactLogo from "./assets/react.svg"
import {Compass} from "./shared/ui/Compass"
import viteLogo from "/vite.svg"

function App() {
	const [position, setPosition] = useState<GeolocationPosition>()
	const [permissionState, setPermissionState] = useState<string>()

	useEffect(() => {
		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setPosition(position)
				setPermissionState("granted")
			},
			(error) => setPermissionState(error.message),
			{enableHighAccuracy: true},
		)

		return () => {
			navigator.geolocation.clearWatch(watchId)
		}
	}, [])

	return (
		<>
			<div>
				<a href='https://vitejs.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<div style={{display: "flex", flexDirection: "column", gap: 2}}>
					<Compass />
					<code>
						Position: {position?.coords.latitude} {position?.coords.longitude}
					</code>
					<code>Permission: {JSON.stringify(permissionState, null, 2)}</code>
				</div>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
			<p>{pJson.version}</p>
		</>
	)
}

export default App
