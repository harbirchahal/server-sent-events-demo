function subscribeEventSource(q) {
	const url = `http://localhost:3000/stream?q=${q}`
  const source = new EventSource(url);

  source.onopen = () => {
		console.info(`[${q}] Steaming server-sent events`);
	}

  source.onmessage = (event) => {
    console.log("[Message]", event.data);
  };

  source.addEventListener("customEvent", (event) => {
    console.log("[CustomEvent]", event.data);
  });

  return source;
}

function registerEventHandler(q) {
  const btn = document.getElementById(q);

  btn.addEventListener("click", () => {
    const source = subscribeEventSource(q);
    // setTimeout(() => {
    //   source.close();
    // }, 10 * 1000);
  });
}
