<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; 
use Illuminate\Support\Facades\Log;  

class PokemonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->input('limit', 20);
        $page = $request->input('page', 1);

        $offset = ($page - 1) * $limit;

        $listResponse = Http::get("https://pokeapi.co/api/v2/pokemon", [
            'limit' => $limit,
            'offset' => $offset,
        ]);

        // handle API failure
        if ($listResponse->failed()) {
            Log::error('Failed to fetch Pokémon list from PokeAPI', ['response' => $listResponse->body()]);
            return response()->json(['error' => 'Could not fetch data from PokeAPI'], 502);
        }

        $pokemonList = $listResponse->json()['results'];
        $formattedPokemons = [];

        foreach ($pokemonList as $pokemon) {
            $detailResponse = Http::get($pokemon['url']);

            if ($detailResponse->successful()) {
                $pokemonDetails = $detailResponse->json();

                $formattedPokemons[] = [
                    'name' => $pokemonDetails['name'],
                    'image' => $pokemonDetails['sprites']['other']['official-artwork']['front_default'],
                    'types' => array_map(function ($typeInfo) {
                        return $typeInfo['type']['name'];   
                    }, $pokemonDetails['types']),
                    'height' => $pokemonDetails['height'],
                    'weight' => $pokemonDetails['weight'],
                ];
            }
        }

        return response()->json($formattedPokemons);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
