import React from "react";

export default function InfoBox({
  title,
  subtitle,
  instructions,
  videos,
  links,
  notes,
}) {
  return (
    <div>
      <div>{title}</div>
      <div>{subtitle}</div>
      <div>{instructions}</div>
      <div>{videos}</div>
      <div>{links}</div>
      <div>{notes}</div>
    </div>
  );
}
