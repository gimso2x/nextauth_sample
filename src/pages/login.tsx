import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onSignInClickHandler = () => {
    signIn("credentials", {
      id: id,
      pw: pw,
    });
  };
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        이메일 :
        <input
          type="text"
          name="text"
          placeholder="test@test.com"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
      </label>
      <label>
        비밀번호 :
        <input
          type="password"
          name="password"
          value={pw}
          onChange={(event) => setPw(event.target.value)}
        />
      </label>
      <button type="submit" onClick={onSignInClickHandler}>
        로그인
      </button>
    </form>
  );
};
export default Login;
