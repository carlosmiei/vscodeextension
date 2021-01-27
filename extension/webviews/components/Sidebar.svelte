<script lang="ts">
import { onMount } from "svelte";

import HelloWorld from "./HelloWorld.svelte";
    let todos: Array<{text:string, completed:boolean}> = []

    onMount(()=>{
        window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        console.log({message});
        switch (message.type) {
            case 'new-todo':
                todos = [{text:message.value, completed:false},...todos];
                break;
        }
    });
    })

    let count = 0;
    let text = "";
</script>


<style>
     div {
         color: pink;
     }
     .completed {
        text-decoration: line-through

     }
 </style>
<div>Hello</div>

<input />

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

<ul>
    {#each todos as todo (todo.text)}
        <li on:click={()=>{
            todo.completed = !todo.completed
        }}
        class:completed = {todo.completed}
        >{todo.text}</li>    
    {/each}
</ul>

<button on:click={()=>{
            tsvscode.postMessage({
                type: 'onInfo',
                value: '🐛  InfoMAF '
            });
}}>Click me </button>

<button on:click={()=>{
    tsvscode.postMessage({
        type: 'onError',
        value: '🐛  Error mESSAGE ' 
    });
}}>Click me for error </button>


