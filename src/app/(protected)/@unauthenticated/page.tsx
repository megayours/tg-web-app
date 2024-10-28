import UserButtons from "@/libs/chromia-connect/user-buttons";
import { Section, Text, Avatar } from "@telegram-apps/telegram-ui";
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
        <Text Component="header" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          NFTs brought alive
        </Text>

        <div style={{ padding: '16px 0' }}>
          <UserButtons />
        </div>
      </div>

      <div className="unauthenticated_features">
        <div className="unauthenticated_feature">
          <Text Component="caption" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            🧩 Composable
          </Text>
          <Text Component="caption">
            Mix & match token features
          </Text>
        </div>

        <div className="unauthenticated_feature">
          <Text Component="caption" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            🎨 Dynamic
          </Text>
          <Text Component="caption">
            Remixable metadata
          </Text>
        </div>

        <div className="unauthenticated_feature">
          <Text Component="caption" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            ⛓️ <br/>On-chain
          </Text>
          <Text Component="caption">
            Metadata on the blockchain
          </Text>
        </div>

        <div className="unauthenticated_feature">
          <Text Component="caption" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            🌐 Decentralized
          </Text>
          <Text Component="caption">
            True ownership
          </Text>
        </div>
      </div>
    </div>

    <div className="unauthenticated_footer">
      <Text Component="caption" style={{ color: 'var(--tg-theme-hint-color)' }}>
        Copyright {new Date().getFullYear()}
      </Text>
      <Link href="https://megayours.com" target="_blank">megayours.com</Link>
    </div>
  </Section>
);

export default Unauthenticated;
