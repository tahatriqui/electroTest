<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produit;
class ProduitController extends Controller
{
    public function index(){
        $produits = Produit::all();
        return response()->json($produits);
    }
}
