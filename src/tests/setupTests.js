require('dotenv').config({ path: '.env.test' })
const Enzyme = require('enzyme')
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')

Enzyme.configure({ adapter: new Adapter() })
