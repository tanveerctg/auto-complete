// import { useState } from "react"
// import { Input, List } from "antd"

// import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService"

// export default ({ a }) => {
// 	console.log(process.env)

// 	const {
// 		placePredictions,
// 		getPlacePredictions,
// 		isPlacePredictionsLoading,
// 		placesAutocompleteService,
// 		placesService,
// 	} = useGoogle({
// 		apiKey: "AIzaSyAQYmSiTmcx1bcOqFgmjBKP_el2cTIDkSI",
// 		debounce: 500,
// 		options: {
// 			fields: ["address_components", "geometry"],
// 			types: ["geocode"],
// 		},
// 	})
// 	const [value, setValue] = useState("")
// 	const [input, setInput] = useState(false)
// 	return (
// 		<div style={{ width: "250px" }}>
// 			<span>Debounced</span>

// 			<Input.Search
// 				style={{ color: "black" }}
// 				value={value}
// 				placeholder='Debounce 500 ms'
// 				onChange={(evt) => {
// 					getPlacePredictions({ input: evt.target.value })
// 					setValue(evt.target.value)
// 					setInput(false)
// 				}}
// 				loading={isPlacePredictionsLoading}
// 			/>
// 			<div
// 				style={{
// 					marginTop: "20px",
// 					width: "200px",
// 					height: "200px",
// 					display: "flex",
// 					flex: "1",
// 					flexDirection: "column",
// 					marginBottom: "100px",
// 				}}
// 			>
// 				{!isPlacePredictionsLoading && !input && (
// 					<List
// 						dataSource={placePredictions}
// 						renderItem={(item) => (
// 							<List.Item
// 								onClick={() => {
// 									console.log(item)
// 									setValue(item.description)
// 									setInput(true)
// 								}}
// 							>
// 								<List.Item.Meta title={item.description} />
// 							</List.Item>
// 						)}
// 					/>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

import React, { useState } from "react"
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { Input, TextField } from "@material-ui/core"
require("dotenv").config()

const useStyles = makeStyles((theme) => ({
	root: {
		width: "1100px",
		maxWidth: "100%",
		margin: "0 auto",
		padding: "20px",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}))

export default () => {
	const [address, setAddress] = useState({
		"Address Line 1": "",
		"Address Line 2": "",
		City: "",
		Country: "",
		State: "",
		"Zip Code": "",
	})

	const classes = useStyles()
	console.log(process.env)
	const { ref: materialRef } = usePlacesWidget({
		apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
		onPlaceSelected: (place) => {
			console.log(place)
			setAddress({
				"Address Line 1": "",
				"Address Line 2": "",
				City: "",
				Country: "",
				State: "",
				"Zip Code": "",
			})

			for (const component of place.address_components) {
				const componentType = component.types[0]

				switch (componentType) {
					case "street_number": {
						setAddress((prev) => ({
							...prev,
							"Address Line 1": prev["Address Line 1"] + component.long_name,
						}))
						break
					}

					case "route": {
						setAddress((prev) => ({
							...prev,
							"Address Line 1":
								prev["Address Line 1"] + " " + component.short_name,
						}))
						break
					}

					case "postal_code": {
						setAddress((prev) => ({
							...prev,
							"Zip Code": component.long_name,
						}))
						break
					}

					case "locality":
						setAddress((prev) => ({
							...prev,
							City: component.long_name,
						}))
						break

					case "administrative_area_level_1": {
						setAddress((prev) => ({
							...prev,
							State: component.long_name,
						}))
						break
					}
					case "country":
						setAddress((prev) => ({
							...prev,
							Country: component.long_name,
						}))
						break
				}
			}
		},
		options: {
			fields: ["address_components", "geometry"],
			types: ["geocode"],
		},
	})
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						readOnly
						fullWidth
						color='secondary'
						variant='outlined'
						inputRef={materialRef}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						readOnly
						fullWidth
						color='secondary'
						variant='outlined'
						value={address["Address Line 1"]}
						placeholder='Address Line 1'
						label='Address Line 1'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						readOnly
						fullWidth
						color='secondary'
						variant='outlined'
						value={address["Address Line 2"]}
						placeholder='Address Line 2'
						label='Address Line 2e'
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						readOnly
						fullWidth
						color='secondary'
						variant='outlined'
						value={address.State}
						placeholder='State'
						label='State'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						readOnly
						fullWidth
						color='secondary'
						variant='outlined'
						value={address.City}
						placeholder='City'
						label='City'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						readOnly
						fullWidth
						color='secondary'
						variant='outlined'
						value={address["Zip Code"]}
						placeholder='Zip Code'
						label='Zip Code'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						readOnly
						fullWidth
						color='secondary'
						variant='outlined'
						value={address.Country}
						placeholder='Country'
						label='Country'
					/>
				</Grid>
			</Grid>
		</div>
	)
}

// import React from "react"
// import Geocode from "react-geocode"

// export default function App() {
// 	// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// 	Geocode.setApiKey("AIzaSyAQYmSiTmcx1bcOqFgmjBKP_el2cTIDkSI")

// 	// set response language. Defaults to english.
// 	Geocode.setLanguage("en")

// 	// set response region. Its optional.
// 	// A Geocoding request with region=es (Spain) will return the Spanish city.
// 	Geocode.setRegion("es")

// 	// set location_type filter . Its optional.
// 	// google geocoder returns more that one address for given lat/lng.
// 	// In some case we need one address as response for which google itself provides a location_type filter.
// 	// So we can easily parse the result for fetching address components
// 	// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// 	// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
// 	Geocode.setLocationType("ROOFTOP")

// 	// Enable or disable logs. Its optional.
// 	Geocode.enableDebug()

// 	// Get latitude & longitude from address.
// 	Geocode.fromAddress("Eiffel Tower").then(
// 		(response) => {
// 			const { lat, lng } = response.results[0].geometry.location
// 			console.log(lat, lng)
// 		},
// 		(error) => {
// 			console.error(error)
// 		}
// 	)

// 	return <div>Hello</div>
// }
