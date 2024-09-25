import {useEffect, useState} from "react"
import pJson from "../package.json"
import "./App.css"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"

function App() {
	const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientationEvent>()
	const [position, setPosition] = useState<GeolocationPosition>()
	const [permissionState, setPermissionState] = useState<string>()
	const [isOrientationPermitted, setIsOrientationPermitted] = useState(false)

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

	useEffect(() => {
		if (!isOrientationPermitted) return

		const handleOrientation = (event: DeviceOrientationEvent) => {
			setDeviceOrientation(event)
		}

		window.addEventListener("deviceorientation", handleOrientation, true)

		return () => {
			window.removeEventListener("deviceorientation", handleOrientation, true)
		}
	}, [isOrientationPermitted])

	const handleOrientationAccessClick = async () => {
		if ((DeviceOrientationEvent as any).requestPermission) {
			try {
				const permissionState = await (DeviceOrientationEvent as any).requestPermission()
				alert(permissionState)
				if (permissionState === "granted") {
					alert("granted")
					setIsOrientationPermitted(true)
				} else {
					alert("denied")
					console.error("Permission denied for device orientation.")
				}
			} catch (error) {
				alert(error)
				console.error("Error requesting permission for device orientation:", error)
			}
		} else {
			alert("old device")
		}
	}

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
					<code>
						Orienatition: {deviceOrientation?.alpha?.toFixed(2)} {deviceOrientation?.beta?.toFixed(2)}{" "}
						{deviceOrientation?.gamma?.toFixed(2)}
					</code>
					<code>
						Position: {position?.coords.latitude} {position?.coords.longitude}
					</code>
					<code>Permission: {JSON.stringify(permissionState, null, 2)}</code>
				</div>
				<button onClick={handleOrientationAccessClick}>Allow orientation</button>
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
