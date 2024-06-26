export function buildHead(head, css) {
    return `
      ${head}
      <style>${css}</style>
    `;
  }