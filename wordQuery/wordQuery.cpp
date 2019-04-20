#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include "WildcardTrie.h"

using std::vector;
using std::string;

/*
 * Complete the 'isMember' function below.
 *
 * The function is expected to return a BOOLEAN.
 * The function accepts following parameters:
 *  1. STRING_ARRAY words
 *  2. STRING query
 */

bool match(string word, string query) {
    if (word.size() != query.size())
        return false;
    for (int i = 0; i < word.size(); i++) {
        if (word[i] != query[i] && query[i] != '*') {
            return false;
        }
    }
    return true;
}

bool isMember(vector<string> words, string query) {
    for (auto word : words) {
        if (match(word, query))
            return true;
    }
    return false;
}

bool isPureWildcard(string str) {
    for (auto c : str) {
        if (c != '*')
            return false;
    }
    return true;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "No filename provided. Exiting\n";
        exit(1);
    }
    WildcardTrie words;
    vector<string> wordbase;
    std::ifstream fin;
    fin.open(argv[1]);
    if (!fin.is_open()) {
        std::cerr << "There was a problem opening the file " << argv[1] << std::endl;
        exit(1);
    }
    string in;
    while (fin>>in) {
        wordbase.push_back(in);
    }
    for (string s : wordbase) {
        std::cout << s << std::endl;
    }
    words.insert("blah");
    std::cout << "inserted";
    string query = "";
    while (std::cin >> query) {
        std::cout << "Searching for matches to '" << query << "': ";
        if (isMember(wordbase, query))
            std::cout << "Success\n";
        else
            std::cout << "Fail\n";
    }

    return 0;
}