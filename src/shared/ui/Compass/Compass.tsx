import {useEffect, useState} from "react"

export const Compass = () => {
	const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientationEvent>()
	const [isOrientationPermitted, setIsOrientationPermitted] = useState(false)
	const [direction, setDirection] = useState<string>()

	useEffect(() => {
		if (!isOrientationPermitted) return

		const handleOrientation = (event: DeviceOrientationEvent) => {
			setDeviceOrientation(event)

			let {alpha} = event
			if (!alpha) return

			if (window.screen.orientation && window.screen.orientation.angle === 180) {
				alpha = (alpha + 180) % 360 // компенсируем 180 градусов
			}

			if (alpha >= 337.5 || alpha < 22.5) setDirection("North")
			else if (alpha >= 22.5 && alpha < 67.5) setDirection("North-East")
			else if (alpha >= 67.5 && alpha < 112.5) setDirection("East")
			else if (alpha >= 112.5 && alpha < 157.5) setDirection("South-East")
			else if (alpha >= 157.5 && alpha < 202.5) setDirection("South")
			else if (alpha >= 202.5 && alpha < 247.5) setDirection("South-West")
			else if (alpha >= 247.5 && alpha < 292.5) setDirection("West")
			else if (alpha >= 292.5 && alpha < 337.5) setDirection("North-West")
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
			setIsOrientationPermitted(true)
			alert("old device")
		}
	}

	if (!isOrientationPermitted) return <button onClick={handleOrientationAccessClick}>Allow orientation</button>

	return (
		<div>
			<code>
				Orienatition: {direction} {deviceOrientation?.alpha?.toFixed(2)} {deviceOrientation?.beta?.toFixed(2)}{" "}
				{deviceOrientation?.gamma?.toFixed(2)}
			</code>
		</div>
	)
}
