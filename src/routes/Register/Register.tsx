import React from "react";
import { useStores } from "../../hooks";
import { observer } from "mobx-react";

const Register: React.FC = observer(() => {
  const { authStore } = useStores();

  return (
    <div>
      <form
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault();
          const elements = (e.target as HTMLFormElement).elements;
          const email = elements.namedItem("email") as HTMLInputElement;
          const password = elements.namedItem("password") as HTMLInputElement;

          await authStore.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        <button type="submit">Register</button>
      </form>
      {authStore.user !== null ? <p>{authStore.user.uid}</p> : null}
    </div>
  );
});

export default Register;
