
import Layout from '@theme/Layout';
import DynamicScreen from '../../screens/DynamicScreen'

export default function JobPost() {
    return (
        <Layout title="Servcies" description="Description will go into a meta tag in <head />">
            <div style={{paddingLeft:100,paddingRight:100, marginLeft:100, marginRight:100, marginTop:20}}>
                <DynamicScreen />
            </div>
        </Layout>)
}