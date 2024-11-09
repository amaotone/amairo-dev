import axios from "axios";
import { afterAll } from "vitest";

afterAll(async () => {
	await axios.delete(
		"http://127.0.0.1:8080/emulator/v1/projects/test/databases/(default)/documents",
	);
});
