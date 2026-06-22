import classNames from "classnames";
import Paragraph from "../../../atoms/Paragraph";
import Title from "../../../atoms/Title";
import style from "./Membership.module.scss";
import Button from "../../../atoms/Button";

interface ITier {
  title: string;
  description: string;
  price: number;
  link: string;
}

export default function Membership() {
  const tiers: ITier[] = [
    {
      title: "Essential",
      description:
        "Open gym access (Off-peak), 2 Group classes monthly, Basic locker room access",
      price: 150.0,
      link: "/membership?title=essential",
    },
    {
      title: "Black Card",
      description:
        "24/7 gym access, Unlimited group classes, Premium locker room access, 1 guest pass monthly",
      price: 280.0,
      link: "/membership?title=black-card",
    },
    {
      title: "Platinum",
      description:
        "24/7 gym access, Unlimited group classes, Premium locker room access, 4 guest passes monthly, Access to exclusive events and workshops",
      price: 450.0,
      link: "/membership?title=platinum",
    },
  ];

  const premiumTier = tiers.sort((a, b) => b.price - a.price)[0];
  const sortPremiumInMiddle = tiers
    .filter((tier) => tier.title !== premiumTier.title)
    .sort((a, b) => a.price - b.price)
    .reduce((result, tier, index, array) => {
      if (index === Math.floor(array.length / 2)) {
        result.push(premiumTier);
      }
      result.push(tier);
      return result;
    }, [] as ITier[]);

  return (
    <section className={style.container}>
      <Title text="Access Tiers" />

      <Paragraph text="Select the level of access that aligns with your ambition." textAlign="center" />

      <div className={style.tiers}>
        {sortPremiumInMiddle.map((tier) => (
          <div
            key={tier.title}
            className={classNames(
              style.card,
              premiumTier.title === tier.title && style.premium,
            )}
          >
            {premiumTier.title === tier.title && (
              <span className={style.badge}>PRESTIGE</span>
            )}

            <Title text={tier.title} size="small" className={style.tierTitle} />

            <div className={style.priceContainer}>
              <Title
                text={`$${tier.price.toFixed(2)}`}
                className={style.tierPrice}
              />

              <Paragraph text="/mo" />
            </div>

            <div className={style.descriptionContainer}>
              {tier.description.split(",").map((line, index) => (
                <div key={index} className={style.descriptionLine}>
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={style.bulletIcon}
                  >
                    <path
                      d="M3.325 7.01458L0 3.68958L0.83125 2.85833L3.325 5.35208L8.67708 0L9.50833 0.83125L3.325 7.01458Z"
                      fill="#D8DADF"
                    />
                  </svg>

                  <Paragraph text={line.trim()} />
                </div>
              ))}
            </div>

            {premiumTier.title === tier.title && (
              <Button
                label="Request Access"
                className={style.joinButton}
                onClick={() => (window.location.href = tier.link)}
              />
            )}

            {premiumTier.title !== tier.title && (
              <Button
                label={"Select " + tier.title}
                className={style.joinButton}
                onClick={() => (window.location.href = tier.link)}
                theme="secondary"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
