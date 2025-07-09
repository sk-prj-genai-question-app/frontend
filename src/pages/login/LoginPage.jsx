import styles from './LoginPage.module.css';
import LoginForm from '../../components/login/LoginForm';

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
