import {useEffect, useState} from "react"
import "./App.css"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"

function App() {
	const [count, setCount] = useState(0)
	const [angle, setAngle] = useState(0)
	const [position, setPosition] = useState<GeolocationPosition>()

	useEffect(() => {
		navigator.geolocation.watchPosition((position) => {
			console.log(position)
			setPosition(position)
		})

		const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
			if (event.alpha) setAngle(event.alpha)
		}

		window.addEventListener("deviceorientation", handleDeviceOrientation, true)

		return () => {
			window.removeEventListener("deviceorientation", handleDeviceOrientation, true)
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
				<p>Angel {angle}</p>
				<code>{JSON.stringify(position, null, 4)}</code>
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</>
	)
}

export default App
