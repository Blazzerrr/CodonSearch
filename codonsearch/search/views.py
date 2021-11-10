from re import search
from django.http import JsonResponse
from django.shortcuts import render


def index(request):
    return render(request, 'search/index.html')


def searchCodon(request):
    chain = "tgacccactaatcagcaacatagcactttgagcaaaggcctgtgttggagctattggccccaaaactgcctttccctaaacagtgttcaccattgtagacctcaccactgttcgcgtaacaactggcatgtcctgggggttaatactcac"

    if request.method == "GET":
        data = request.GET
        combination = data['combination']

        # Validate data
        # If combination is empty
        if len(combination) > 3 or len(combination) < 3:
            return JsonResponse({'error': 'combination should consist of 3 nucleotides'}, status=400) 

        # If user send wrong nucleotide
        for i in combination:
            if i.upper() != 'A' and i.upper() != 'C' and i.upper() != 'G' and i.upper() != 'T':
                return JsonResponse({'error': 'you are entering an invalid combination of nucleotides (acceptable nucleotides: A, C, G, T)'}, status=400) 


        # Solutions
        def solution1(combination):
            if combination in chain:
                return True
            else:
                return False


        def solution2(combination):
            try:
                chain.index(combination)
                return True

            except ValueError:
                return False
        

        def solution3(combination):
            if chain.find(combination) != -1:
                return True
            else:
                return False
        

        def solution4(combination):
            if search(combination, chain):
                return True
            else:
                return False

        result = solution1(combination)

        if result == True:
            return JsonResponse({'success': 'codon found'}, status=200) 
        else:
            return JsonResponse({'fail': 'codon not found'}, status=200)
