import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();

  const handleJoin = async (event: FormEvent<HTMLFormElement>) => {
    const res = await fetch(`/api/join`, {
      method: "post",
      body: JSON.stringify({ id, pw }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) router.push("/");
      });
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleJoin(event);
      }}
    >
      회원가입
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
      <button type="submit">회원가입</button>
    </form>
  );
};
export default Login;
