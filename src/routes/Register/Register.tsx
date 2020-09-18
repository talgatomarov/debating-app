import React, { useState } from "react";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { AuthError } from "interfaces";

const Register: React.FC = observer(() => {
  const [error, setError] = useState<AuthError | null>(null);
  const { authStore } = useStores();

  return (
    <div>
      <form
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault();
          const elements = (e.target as HTMLFormElement).elements;
          const email = elements.namedItem("email") as HTMLInputElement;
          const password = elements.namedItem("password") as HTMLInputElement;

          try {
            await authStore.createUserWithEmailAndPassword(
              email.value,
              password.value
            );
          } catch (err) {
            setError(err);
          }
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        <button type="submit">Register</button>
      </form>
      {error !== null ? <p>{error.message}</p> : null}
      {authStore.user !== null ? <p>{authStore.user.uid}</p> : null}
    </div>
  );
});

export default Register;
