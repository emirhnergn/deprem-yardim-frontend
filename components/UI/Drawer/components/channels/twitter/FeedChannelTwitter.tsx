import { useState } from "react";
import styles from "./FeedChannelTwitter.module.css";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import PlaceholderTweet from "./PlaceholderTweet";
import { FeedChannelTwitterProps } from "../../types";
import EmbedTweet from "./EmbedTweet";
import { useTranslation } from "next-i18next";
import { Button } from "@mui/material";
import { CopyAll } from "@mui/icons-material";

const FeedChannelTwitter = ({
  full_text,
  extra_parameters,
}: FeedChannelTwitterProps) => {
  const { t } = useTranslation("home");
  const [showSavedData, setShowSavedData] = useState(true);

  return (
    <div className={styles.sourceContent}>
      <div className={styles.sourceHelpContent}>
        <Typography className={styles.sourceContentTitle}>
          {t("content.helpContent")}
        </Typography>

        {extra_parameters && extra_parameters.name && (
          <div className={styles.sourceContentSwitch}>
            <p> {t("content.showData")}</p>
            <Switch
              checked={showSavedData}
              onChange={() => setShowSavedData((s) => !s)}
            />
          </div>
        )}
      </div>
      {showSavedData ? (
        <PlaceholderTweet source={extra_parameters!} full_text={full_text} />
      ) : (
        <EmbedTweet source={extra_parameters!} />
      )}
      {!!full_text && (
        <Button
          variant="outlined"
          size="small"
          fullWidth
          onClick={() => navigator.clipboard.writeText(full_text)}
          startIcon={<CopyAll className={styles.btnIcon} />}
        >
          {t("cluster.copyFullText")}
        </Button>
      )}
    </div>
  );
};

export default FeedChannelTwitter;
