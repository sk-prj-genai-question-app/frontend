import styles from './RegisterPage.module.css'
import RegisterForm from '../../components/login/RegisterForm';

const RegisterPage = () => {
  return (
    <div className = {styles.RegisterPage}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
