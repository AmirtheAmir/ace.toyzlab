"use client";

type Props = {
  activeTab: "orders" | "profile";
  onSelectTab: (tab: "orders" | "profile") => void;
  onSignOut: () => void;
};

export default function NavigationItemProfileMode({
  activeTab,
  onSelectTab,
  onSignOut,
}: Props) {
  return (
    <div className="flex ">
      <button
        type="button"
        onClick={() => onSelectTab("orders")}
        className={[
          "py-4 px-6 border bg-bg-base border-none ringed-right ",
          "flex hover:cursor-pointer select-none items-center gap-2",
          "font-S-500 text-text-primary",
          activeTab === "orders"
            ? "text-text-primary underline underline-offset-4"
            : "text-text-primary hover:text-text-primary",
        ].join(" ")}
      >
        Orders
      </button>

      <button
        type="button"
        onClick={() => onSelectTab("profile")}
        className={[
          "py-4 px-6 border bg-bg-base border-none ringed-right ",
          "flex hover:cursor-pointer select-none items-center gap-2",
          "font-S-500 text-text-primary",
          activeTab === "profile"
            ? "text-text-primary underline underline-offset-4"
            : "text-text-primary hover:text-text-primary",
        ].join(" ")}
      >
        Profile
      </button>

      <button
        type="button"
        onClick={onSignOut}
        className={[
          "py-4 px-6 border bg-bg-base border-none ringed-right ",
          "flex hover:cursor-pointer select-none items-center gap-2",
          "font-S-500 text-text-primary hover:text-text-inverted hover:bg-bg-inverted transition-colors duration-300 ease-in",
        ].join(" ")}
      >
        Sign Out
      </button>
    </div>
  );
}
