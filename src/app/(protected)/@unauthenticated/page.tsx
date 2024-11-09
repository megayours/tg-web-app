import UserButtons from "@/libs/chromia-connect/user-buttons";
import { Section } from "@telegram-apps/telegram-ui";
import "./styles.css";
import Logo from "@/components/Logo/Logo";

const Unauthenticated = () => (
  <Section className="unauthenticated_container">
    <div className="unauthenticated_main">
      <div className="unauthenticated_logo">
        <Logo />
      </div>

      <div className="unauthenticated_card">
        <div style={{ padding: '16px 0' }}>
          <UserButtons />
        </div>
      </div>
    </div>
  </Section>
);

export default Unauthenticated;
