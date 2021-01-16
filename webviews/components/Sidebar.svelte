<script lang="ts">
    let todos = []
    let count = 0;
    let text = "";
</script>


<style>
     div {
         color: pink;
     }
 </style>
<div>Hello</div>

<input />
<h1>Hello</h1>
<div>{count}</div>
<button on:click={()=>{
    count++
}}> 
Increment
</button>

<input bind:value={text}/>
<div>{text}</div>