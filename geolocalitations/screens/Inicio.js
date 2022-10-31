import React, { Component, useEffect,useState,useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView,SafeAreaView,Image} from 'react-native';

//importamos el boton
import { BotonCeleste } from '../components/Boton';

//importamos el appLoading
import AppLoading from 'expo-app-loading'

//importamos la fuente
import {Aladin_400Regular,useFonts} from '@expo-google-fonts/aladin'

//importamos el packete o modulo de los iconos
import { Entypo } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

//importams asyncstorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from '@rneui/base';


const Inicio = () => {

    const [appIsReady, setAppIsReady] = useState(false);
    const [user,setUser] = useState();

let [cargarFuente] = useFonts({
    Aladin_400Regular
})


useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
    obtenerPerfil();
  }, []);


const borrarAsyncStorage = async () => {
  await AsyncStorage.clear();
  console.log(AsyncStorage.getItem('@storage_Key'));
}

const obtenerPerfil = async () => {
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



  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
if(!cargarFuente){
  return  <AppLoading/>
}else{
    return(
      <ScrollView>
              <View   style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#1A99F9'}}
        onLayout={onLayoutRootView} >
           <View style={stilos.trasFondo}>
                
                    <SafeAreaView style={styles.container}>
                    <View style={styles.imageContainer}>
                      {/* <Image source={pic} style={styles.image} /> */}
                    </View>
                    <Text h4 style={styles.name}>
                    <Text style={{fontFamily:'Aladin_400Regular',fontSize:30,alignSelf:"center",color:'#1A99F9'}}>Inicio</Text>
                    <Text style={{fontFamily:'Aladin_400Regular',fontSize:30,alignSelf:"center",color:'#1A99F9'}}>Session App<Entypo name="location-pin" size={33} color="#1A99F9" /></Text>
                    </Text>
                    <View style={styles.data}>
                    <Text style={styles.desc}>
                    {user? (<Text style={{fontSize:15}}>Nombre:{`${user.user.nombre}`}</Text>):(<Text>No session!</Text>)}
                    </Text>
                    <Text style={styles.desc}>
                    {user? (<Text style={{fontSize:15}}>Email:{`${user.user.email}`}</Text>):(<Text>No session!</Text>)}
                    </Text>
                    <Text style={styles.desc}>
                    {user? (<Text style={{fontSize:15}}>Contraseña:{`${user.user.contrasena}`}</Text>):(<Text>No session!</Text>)}
                    </Text>
                    <Text style={styles.desc}>
                    {user? (<Text style={{fontSize:15}}>Token:{`${user.token}`}</Text>):(<Text>No session!</Text>)}
                    </Text>
                    <Button title={"Cerrar session"} onPress={()=> borrarAsyncStorage()}/>
                    </View>
                    </SafeAreaView>
                    </View>
            </View>
      </ScrollView>
    )
}


}

const stilos = StyleSheet.create({
    trasFondo:{
        backgroundColor:'#ffffff',
        marginTop:'20%',
        height:750,
        width:410,
        alignSelf:"center",
        borderRadius:100
    },
    inicio:{
        backgroundColor:'#1A99F9',
        height:850
    },
    fondo:{
        alignItems: 'center',
        marginTop:'80%',
        backgroundColor:'#ffffff'
    },
    titulo:{
            marginTop:'20%'
    }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"white"
  },
  imageContainer: {
    margin: 20,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'center',
    marginLeft: 30,
  },
  desc: {
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  divider: {
    backgroundColor: '#C0C0C0',
    width:  - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  /*   width: Layout.window.width, */
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  data:{
    backgroundColor:"#E4E4E4",
    color:"black",
    borderRadius:10,
    marginTop:20
  }
})
export default Inicio;

