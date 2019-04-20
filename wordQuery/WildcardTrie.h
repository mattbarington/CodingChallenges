#ifndef WILDCARDTRIE_H
#define WILDCARDTRIE_H
#include <map>
#include <string>

class TrieNode {
    friend class Trie;
  public:
    TrieNode() {
        endOfWord = false;
    }
    std::map<char, TrieNode*> children;
    bool endOfWord;
};


class WildcardTrie {
  private:
    TrieNode* root;
  public:
    void insert(std::string str) {
        TrieNode* current = root;
        for (char c : str) {
            auto it = current->children.find(c);
            TrieNode* node = nullptr;
            if (it == current->children.end()) {
                node = new TrieNode();
                current->children.insert(std::pair<char, TrieNode*>(c, node));
            } else {
                node = it->second;
            }
            current = node;
        }
        current->endOfWord = true;
    }
    bool isMember(std::string query);
    void remove(std::string str);
};

#endif
