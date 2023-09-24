<script lang="ts">
	import { scoreStore } from './scores';
	import { formatNumber } from "./utils";
	
	let score=0;
	scoreStore.subscribe(value => {
		score = Math.floor(value)
	})

	function fizzbuzz(n: number) {
		if (n===0) return "0";
		if (n % 15 === 0) return 'FizzBuzz';
		if (n % 3 === 0) return 'Fizz';
		if (n % 5 === 0) return 'Buzz';
		return n;
	}
</script>

<p class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">{fizzbuzz(score)}</p>
<p class="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">{formatNumber(Math.floor(score / 15))} FB</p>
