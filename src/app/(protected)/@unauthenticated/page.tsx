import UserButtons from "@/libs/chromia-connect/user-buttons";
import { Section, Text } from "@telegram-apps/telegram-ui";
import "./styles.css";
import Logo from "@/components/Logo/Logo";
import Link from "next/link";

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

      <div className="unauthenticated_features">
        <div className="unauthenticated_feature">
          <Text Component="span" style={{ fontWeight: 'bold', marginBottom: '2px' }}>
            🧩 Composable
          </Text>
          <Text Component="span">
            Mix & match token features
          </Text>
        </div>

        <div className="unauthenticated_feature">
          <Text Component="span" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            🎨 Dynamic
          </Text>
          <Text Component="span">
            Remixable metadata
          </Text>
        </div>

        <div className="unauthenticated_feature">
          <Text Component="span" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            ⛓️ <br/>On-chain
          </Text>
          <Text Component="span">
            Metadata on the blockchain
          </Text>
        </div>

        <div className="unauthenticated_feature">
          <Text Component="span" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            🌐 Decentralized
          </Text>
          <Text Component="span">
            True ownership
          </Text>
        </div>
      </div>
    </div>

    <div className="unauthenticated_footer">
      <Text Component="span" style={{ color: 'var(--tg-theme-hint-color)' }}>
        Copyright {new Date().getFullYear()}
      </Text>
      <Link href="https://megayours.com" target="_blank">megayours.com</Link>
    </div>
  </Section>
);

export default Unauthenticated;
