import { Button } from '../../Atoms/Button'
import {
  onAuthWithGithub,
  onAuthWithTwitter,
  onAuthWithGoogle,
} from '../../../firebase/client'
import styles from './LoginMethods.module.css'

export const LoginMethods = () => {
  return (
    <section className={styles.container}>
      <Button onClick={onAuthWithGithub}>Inicio de sesion con Github</Button>
      <Button onClick={onAuthWithTwitter}>Inicio de sesion con Twitter</Button>
      <Button onClick={onAuthWithGoogle}>Inicio de sesion con Google</Button>
    </section>
  )
}
