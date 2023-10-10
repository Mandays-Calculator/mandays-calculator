import type { ReactElement } from "react";
import type { RootState, AppDispatch } from "~/redux/store";
import type { LoginState } from "~/redux/reducers/login/types";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import LocalizationKey from "~/i18n/key";
import { loginUser } from "~/redux/reducers/login";

const Login = (): ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const { login } = LocalizationKey;
  const loginState: LoginState = useSelector((state: RootState) => state.login);
  const { t } = useTranslation();

  console.log(loginState);

  const onLogin = (): void => {
    dispatch(loginUser());
  };

  return (
    <div>
      <h1>{`${t(login.management)}  ${loginState.isLoggedIn}`}</h1>
      <button onClick={onLogin}>Test dispatch login</button>
    </div>
  );
};

export default Login;
