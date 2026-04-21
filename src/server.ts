import { app } from './app'
import { AppDataSource } from './database/DataSource'

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
    .then(() => {
        console.log('Connected database')
    })
    .catch((error) => {
        console.log('Error during inicialization Database')
    })

    app.listen(PORT, () => {
        console.log('Server running on port 3000')
})
