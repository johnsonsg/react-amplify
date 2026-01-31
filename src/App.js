import logo from './logo.svg'
import '@aws-amplify/ui-react/styles.css'
import {
	withAuthenticator,
	Button,
	Heading,
	Image,
	View,
	Card,
} from '@aws-amplify/ui-react'

function App({ signOut, user }) {
  return (
    <View className="App">
      <Card>
        <Heading level={1}>Hello {user.username}</Heading>
        <View as="p">You are now signed in!</View>
      </Card>
       <Button onClick={signOut}>Sign Out</Button>
    </View>
  )
}

export default withAuthenticator(App);