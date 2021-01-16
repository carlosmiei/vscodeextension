<script lang="ts">
import HelloWorld from "./HelloWorld.svelte";

    let todos: Array<{text:string, completed:boolean}> = []
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
<button on:click={()=>{
    text="";
}}>RESET</button>


<form on:submit|preventDefault={e=>{
    todos = [{text, completed:false},...todos]
    text="";
    //e.preventDefault();
}}>
    <input bind:value={text}/>
</form>

<pre>
    {JSON.stringify(todos,null,2)}
</pre>