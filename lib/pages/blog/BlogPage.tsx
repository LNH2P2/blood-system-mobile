import LoadingOverlay from '@/lib/components/Loading'
import { useBlogs } from '@/lib/hooks/api/useBlog'
import React, { useState } from 'react'
import { FlatList, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BlogList from './components/BlogList'

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const { data: blogs, isLoading } = useBlogs()
  console.log(blogs)
  const filteredBlogs = blogs?.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.summary.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder='Search blogs...'
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 16
        }}
      />
      <FlatList
        data={filteredBlogs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <BlogList item={item} />}
      />
    </SafeAreaView>
  )
}
