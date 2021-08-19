import { Spinner } from '../../Atoms/Spinner'
import styles from './Loading.module.css'

export const Loading = () => {
  return (
    <main className={styles.container}>
      <Spinner />
    </main>
  )
}
