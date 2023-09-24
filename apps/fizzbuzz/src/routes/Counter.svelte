<script lang="ts">
	import { score } from './scores';


	let count=0;
	score.subscribe(value => {
		count = value
	})

	function fizzbuzz(n: number) {
		if (n===0) return "Start";
		if (n % 15 === 0) return 'FizzBuzz';
		if (n % 3 === 0) return 'Fizz';
		if (n % 5 === 0) return 'Buzz';
		return n;
	}
</script>

<p class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">{fizzbuzz(count)}</p>
<p class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">{Math.floor(count / 15)} fb</p>
