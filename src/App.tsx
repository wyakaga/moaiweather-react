import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Router from "./pages/router";

function App() {
	const queryClient = new QueryClient();

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
