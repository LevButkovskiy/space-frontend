import {useEffect, useState} from "react"
import "./App.css"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"

function App() {
	const [angle] = useState(0)
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

	// useEffect(() => {
	// 	getGeolocation()
	// }, [])

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
					<p>Angel {angle}</p>
					<code>
						Position: {JSON.stringify(position, null, 4)} {position?.coords.latitude}{" "}
						{position?.coords.longitude}
					</code>
					<code>Permission: {JSON.stringify(permissionState, null, 2)}</code>
				</div>
				{/* <button onClick={getGeolocation}>get geo</button> */}
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</>
	)
}

export default App
