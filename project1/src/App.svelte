<script>
	let name = 'world';
	//a src where the image will be loaded from a free image hosting
	let src = 'https://picsum.photos/200/200';
	let text = 'Text to <strong> enhance </strong> the <em> text </em> of the <u> page </u>!';
</script>

<img {src} alt="One imagem from {name} app" />
<h1>Hello {name}!</h1>
<p>{@html text}</p>

<style>
	h1 {
		color: red;
	}
</style>
