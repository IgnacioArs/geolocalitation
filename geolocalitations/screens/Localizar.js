//importando todo
import * as React from 'react';
import * as Location from 'expo-location'
//importamos alert

import MapView, { Callout, Circle, Marker,Polyline  } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_KEY} from '@env' 


//importamos los iconos
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Button } from '@rneui/base';
//importamos la imagen de icono
const usuario = require('../assets/img/usuario.png') 
//importamos axios para realizar las peticiones http
import axios from 'axios'
//aqui usamos el async storage
import AsyncStorage from '@react-native-async-storage/async-storage'




export default function Localizar(props) {

const [punto,setPunto] = React.useState({
    latitude: -42.477840,
    longitude: -73.764222,
})

const [region,setRegion] = React.useState({
  latitud:-42.477840,
  longitud: -73.764222,
  latitudeDelta:0.09,
  longitudeDelta:0.04
})

const [user,setUser]=React.useState()

//estas cordenadas son para que se coloquen como propiedades en MapViewDirections
let origen = {latitude:region.latitud, longitude:region.longitud}
let destino = {latitude:punto.latitude, longitude:punto.longitude}




/* React.useEffect(() => {
  getLocationPermission();
}, [])

async function getLocationPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if(status !== 'granted') {
    alert('Permission denied');
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  const current = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  }
  setPunto(current)
} */


React.useEffect(()=>{
obtenerLocalizacionPersonal();
obtenerAlmacenamiento();
},[])

  
const obtenerAlmacenamiento = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
/*     return jsonValue != null ? JSON.parse(jsonValue) : null; */
    const datosAsyncStorage =  JSON.parse(jsonValue)
    setUser(datosAsyncStorage)
    console.log("Los datos actuales de asinc storage",user.token);
  } catch(e) {
    // error reading value
  }
}


//funcion para obtener nuestra localizacion
async function obtenerLocalizacionPersonal(){
  
  let { status } = await Location.requestForegroundPermissionsAsync()
  if(status !== 'granted'){
    alert('Tu geolocalizacion a sido denegada!')
    return;
  }
  
  //guardamos la posision actual con el metodo asincrono
  let localizando = await Location.getCurrentPositionAsync({})
  //guardamos los puntos donde estamos 
  const recorrido = {
    latitude:localizando.coords.latitude,
    longitude:localizando.coords.longitude
  }
  
  //AQUI AGREGAMOS A REGION
  setPunto(recorrido)
  }


const GuardarRecorrido = async () => {
console.log("latitude",punto.latitude,"longitude",punto.longitude)
await axios.post('http://192.168.132.35:4000/saveme/insertarRutas',{punto,region,user}).then(()=>{
  alert("se ha enviado punto y region");
  props.navigation.navigate("Listado");
})




}

  return (
    <View style={{marginTop:50,flex:1}}>
      <View style={styles.fixToText}>
        <Button onPress={()=> obtenerLocalizacionPersonal()}>Localizacion Obtener <MaterialCommunityIcons name="crosshairs-gps" size={24} color="white"/></Button>
        <Button onPress={() => GuardarRecorrido()}><MaterialCommunityIcons name="content-save" size={24} color="white" /> Guardar Localizacion</Button>
      </View>
    {/*   <Button title={"Ubicacion actual"} onPress={()=> obtenerLocalizacionPersonal()}/>
      <Button title={"Guardar Recorrido"} style={{width:50}} onPress={()=> GuardarRecorrido()}/> */}
    {/*  aplicamos el buscador aqui */}
      <MapView style={styles.map}  initialRegion={{
      //en la posicion en la que esta el circulo y va a mostrar primero el mapa
      latitude:-42.477840,
      longitude: -73.764222,
      //esta es la cantidad de zom que va hacer  el mapa al momento de encotrar tu posicion
      latitudeDelta:0.09,
     longitudeDelta:0.04
    }} 
    //le daremos otro tipo de vista
    provider="google"
   
    >

    <Marker coordinate={{ latitude: region.latitud, longitude: region.longitud }}   draggable={true}
      onDragStart={(e)=>{console.log("llegada recorrido",e.nativeEvent.coordinate)}}
      //donde termina
      onDragEnd={(e)=>{setRegion({
        latitud:e.nativeEvent.coordinate.latitude,
        longitud:e.nativeEvent.coordinate.longitude
      })}}
      image={usuario}
    >
    <Callout>
                <Text><MaterialCommunityIcons name="ray-start-end" size={24} color="black" /> Punto de llegada </Text>
                <Text><MaterialCommunityIcons name="latitude" size={24} color="black" /> Latitude: {region.latitud}</Text>
                <Text><MaterialCommunityIcons name="longitude" size={24} color="black" /> Longitude: {region.longitud}</Text>
    </Callout>
    </Marker>

   {/*  y marker con su latitude y longitude nos mostrara donde estara el punto rojo */}
    <Marker coordinate={{
     latitude:punto.latitude,
     longitude:punto.longitude,}}
     pinColor="red"
     draggable={true}
     //aqui es donde empieza las cordenadas que asignaremos 
     onDragStart={(e)=>{console.log("inicio recorrido",e.nativeEvent.coordinate)}}
      //donde termina
     onDragEnd={(e)=>{setPunto({
        latitude:e.nativeEvent.coordinate.latitude,
        longitude:e.nativeEvent.coordinate.longitude
     })}}
      >
      <Callout>
            <Text><MaterialCommunityIcons name="ray-start" size={24} color="black" /> Punto de inicio </Text>
            <Text><MaterialCommunityIcons name="latitude" size={24} color="black" /> Latitude: {punto.latitude}</Text>
            <Text><MaterialCommunityIcons name="longitude" size={24} color="black" /> Longitude: {punto.longitude}</Text>
      </Callout>
    </Marker>

     <MapViewDirections
      origin={origen}
      destination={destino}
      strokeColor="#000" 
      apikey={GOOGLE_MAPS_KEY}
      strokeColors={[
        '#7F0000',
        '#00000000', 
        '#B24112',
        '#E5845C',
        '#238C23',
        '#7F0000'
      ]}
      strokeWidth={6}
      /> 
 
  {/*   <Polyline
		coordinates={[
			{ latitude:region.latitud, longitude:region.longitud },
			{ latitude:punto.latitude, longitude:punto.longitude },
		]}
		strokeColor="#000" 
		strokeColors={[
			'#7F0000',
			'#00000000', 
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>   */}
    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
