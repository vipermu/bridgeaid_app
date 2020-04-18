import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView, Linking } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';

export default class App extends React.Component {
  state = {
    loading: false,
  }
  render() {
    const uri = 'https://bridgeaid.glideapp.io/';

    return (
      <View style={{ flex: 1 }}>
        <WebView 
          ref={(ref) => (this.webview = ref)}
          source={{ uri: uri }} 
          style={styles.webview} 
          userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
          onNavigationStateChange={ (event) => {
                if (
                  !event.url.split('.').includes('glideapp') 
                  && !event.url.split('.').includes('glideapps') 
                  && !event.url.split(".").includes('google')) {
                    this.webview.stopLoading();
                    WebBrowser.openBrowserAsync(event.url);
                }
          }}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  webview: {
    marginTop: 0,
  }
});