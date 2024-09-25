import {useEffect, useState} from "react"
import "./App.css"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"

function App() {
	const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientationEvent>()
	const [position, setPosition] = useState<GeolocationPosition>()
	const [permissionState, setPermissionState] = useState<string>()

	useEffect(() => {
		const handleOrientation = (event: DeviceOrientationEvent) => {
			setDeviceOrientation(event)
		}
		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setPosition(position)
				setPermissionState("granted")
			},
			(error) => setPermissionState(error.message),
			{enableHighAccuracy: true},
		)
		const requestDeviceOrientationPermission = async () => {
			// Приведение типов к any, чтобы использовать метод requestPermission
			if ((DeviceOrientationEvent as any).requestPermission) {
				try {
					const permissionState = await (DeviceOrientationEvent as any).requestPermission()
					alert(permissionState)
					if (permissionState === "granted") {
						alert("granted")
						// Если разрешение предоставлено, добавляем слушатель события
						window.addEventListener("deviceorientation", handleOrientation, true)
					} else {
						alert("denied")

						console.error("Permission denied for device orientation.")
					}
				} catch (error) {
					console.error("Error requesting permission for device orientation:", error)
				}
			} else {
				// Для старых устройств или тех, где разрешение не требуется
				alert("old device")
				window.addEventListener("deviceorientation", handleOrientation, true)
			}
		}

		// Вызов функции запроса разрешения
		requestDeviceOrientationPermission()

		return () => {
			navigator.geolocation.clearWatch(watchId)
			window.removeEventListener("deviceorientation", handleOrientation, true)
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
					<code>
						Orientation: {JSON.stringify(deviceOrientation, null, 4)} {deviceOrientation?.alpha}
						{deviceOrientation?.beta} {deviceOrientation?.gamma}
					</code>
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
