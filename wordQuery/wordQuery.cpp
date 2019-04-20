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
        if (match(word, query)) {
            return true;
        }
    }
    return false;
}

bool isPureWildcard(string str) {
    for (auto c : str) {
        if (c != '*') {
            return false;
        }
    }
    return true;
}

void putInTrie(std::map<int, WildcardTrie>& wordTries, std::string str) {
    if (wordTries.find(str.length()) == wordTries.end()) {
        wordTries.insert(std::pair<int, WildcardTrie>(str.length(), WildcardTrie()));
    }
    auto it = wordTries.find(str.length());
    it->second.insert(str);
}

bool isMember(std::map<int, WildcardTrie>& wordTries, std::string query) {
    auto it = wordTries.find(query.length());
    if (isPureWildcard(query)) {    // query is made up of all wildcards: 
                                    //  would match any word with same length
        return it != wordTries.end();
    }
    WildcardTrie* root = &it->second;
    return root->search(query);
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "No filename provided. Exiting\n";
        exit(1);
    }

    std::map<int, WildcardTrie> wordbase;
    std::ifstream fin;
    fin.open(argv[1]);
    if (!fin.is_open()) {
        std::cerr << "There was a problem opening the file " << argv[1] << std::endl;
        exit(1);
    }
    string in;
    while (fin >> in) {
        putInTrie(wordbase, in);
    }
    string query = "";
    while (std::cin >> query) {
        std::cout << "Searching for matches to '" << query << "': ";
        if (isMember(wordbase, query)) {
            std::cout << "Success\n";
        } else {
            std::cout << "Fail\n";
        }
    }

    return 0;
}