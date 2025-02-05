import { FormEvent, useCallback, useState } from 'react';
import signin from '@/components/signIn/SignIn.module.scss';
import { useInput } from '@/hooks/useInput';
import { useUser } from '@/hooks/useAPI';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface SignInFormProps {
  handleSignIn: ({ email, password }: { email: string; password: string }) => void;
}

const SignInForm = ({ handleSignIn }: SignInFormProps) => {
  const { myData } = useUser();
  const [emailInputValue, _setEmailInputValue, onChangeSetEmailInputValue] = useInput('');
  const [passwordInputValue, _setPasswordInputValue, onChangeSetPasswordInputValue] = useInput('');
  const [isShowEmailCautionLetter, setIsShowEmailCautionLetter] = useState(false);
  const [isShowPasswordCautionLetter, setIsShowPasswordCautionLetter] = useState(false);

  // const [isOwner, setIsOwner] = useState(false);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setIsShowEmailCautionLetter(() => false);
      setIsShowPasswordCautionLetter(() => false);

      const email = emailInputValue.trim();
      const password = passwordInputValue.trim();

      if (!email) setIsShowEmailCautionLetter(() => true);
      if (!password) setIsShowPasswordCautionLetter(() => true);
      if (!(email && password)) return;
      handleSignIn({ email, password });
    },
    [emailInputValue, passwordInputValue, isShowEmailCautionLetter, isShowPasswordCautionLetter],
  );

  // const handleIsOwner = useCallback(() => {
  //   setIsOwner((pre) => !pre);
  // }, [setIsOwner, isOwner]);

  if (myData) {
    //로그인 되어있으면 홈으로 보냄
    toast.info('이미 로그인 되어있습니다.');
    return <Navigate to="/" replace />;
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="구글 이메일을 입력해주세요"
          value={emailInputValue}
          onChange={onChangeSetEmailInputValue}
        />
        <p className={[signin['caution'], isShowEmailCautionLetter ? signin['show'] : ''].join(' ')}>
          이메일이 입력되지 않았습니다.
        </p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={passwordInputValue}
          onChange={onChangeSetPasswordInputValue}
        />
        <p className={[signin['caution'], isShowPasswordCautionLetter ? signin['show'] : ''].join(' ')}>
          비밀번호가 입력되지 않았습니다.
        </p>
      </div>
      {/* <div>
        <span>사업자로 로그인하기</span>
        <input type="checkbox" onChange={handleIsOwner} />
      </div> */}
      <div>
        <button
          type="submit"
          onClick={() => {
            // toast.success('success!!');
          }}
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
